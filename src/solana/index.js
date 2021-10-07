import Wallet from "@project-serum/sol-wallet-adapter";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    TransactionInstruction
} from "@solana/web3.js";
import { deserialize, serialize } from "borsh";

const cluster = "https://api.devnet.solana.com";
const connection = new Connection(cluster, "confirmed");
const wallet = new Wallet("https://www.sollet.io", cluster);
const programId = new PublicKey(
    "286rapsUbvDe1ZgBeNhp37YHvEPwWPTr4Bkce4oMpUKT"
);


export async function setPayerAndBlockhashTransaction(instructions) {
    const transaction = new Transaction();
    instructions.forEach(element => {
        transaction.add(element);
    });
    transaction.feePayer = wallet.publicKey;
    let hash = await connection.getRecentBlockhash();
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
}

export async function signAndSendTransaction(transaction) {
    try {
        console.log("start signAndSendTransaction");
        let signedTrans = await wallet.signTransaction(transaction);
        console.log("signed transaction");
        let signature = await connection.sendRawTransaction(
            signedTrans.serialize()
        );
        console.log("end signAndSendTransaction");
        return signature;
    } catch (err) {
        console.log("signAndSendTransaction error", err);
        throw err;
    }
}

class CampaignDetails {
    constructor(properties) {
        Object.keys(properties).forEach((key) => {
            this[key] = properties[key];
        });
    }
    static schema = new Map([[CampaignDetails,
        {
            kind: 'struct',
            fields: [
                ['admin', [32]],
                ['name', 'string'],
                ['description', 'string'],
                ['image_link', 'string'],
                ['amount_donated', 'u64']]
        }]]);
}
async function checkWallet() {
    if (!wallet.connected) {
        await wallet.connect();
    }
}

export async function createCampaign(
    name, description, image_link
) {
    await checkWallet();

    const SEED = "abcdef" + Math.random().toString();
    let newAccount = await PublicKey.createWithSeed(
        wallet.publicKey,
        SEED,
        programId
    );

    let campaign = new CampaignDetails({
        name: name,
        description: description,
        image_link: image_link,
        admin: wallet.publicKey.toBuffer(),
        amount_donated: 0
    })

    let data = serialize(CampaignDetails.schema, campaign);
    let data_to_send = new Uint8Array([0, ...data]);

    const lamports =
        (await connection.getMinimumBalanceForRentExemption(data.length));
    console.log(data.length);
    const createProgramAccount = SystemProgram.createAccountWithSeed({
        fromPubkey: wallet.publicKey,
        basePubkey: wallet.publicKey,
        seed: SEED,
        newAccountPubkey: newAccount,
        lamports: lamports,
        space: data.length,
        programId: programId,
    });

    const instructionTOOurProgram = new TransactionInstruction({
        keys: [
            { pubkey: newAccount, isSigner: false, isWritable: true },
            { pubkey: wallet.publicKey, isSigner: true, }
        ],
        programId: programId,
        data: data_to_send,
    });

    const trans = await setPayerAndBlockhashTransaction(
        [createProgramAccount, instructionTOOurProgram]
    );
    const signature = await signAndSendTransaction(trans);
    const result = await connection.confirmTransaction(signature);
    console.log("end sendMessage", result);
}


export async function getAllCampaigns() {
    let accounts = await connection.getProgramAccounts(programId);
    let x = []
    accounts.forEach((e) => {
        try {
            let campData = deserialize(CampaignDetails.schema, CampaignDetails, e.account.data);
            x.push({
                pubId: e.pubkey,
                name: campData.name,
                description: campData.description,
                image_link: campData.image_link,
                amount_donated: campData.amount_donated,
                admin: campData.admin,
            });
        } catch (err) {
            console.log(err);
        }
    });
    return x;
}



export async function donateToCampaign(
    campaignPubKey, amount
) {
    await checkWallet();

    const SEED = "abcdef" + Math.random().toString();
    let newAccount = await PublicKey.createWithSeed(
        wallet.publicKey,
        SEED,
        programId
    );

    const createProgramAccount = SystemProgram.createAccountWithSeed({
        fromPubkey: wallet.publicKey,
        basePubkey: wallet.publicKey,
        seed: SEED,
        newAccountPubkey: newAccount,
        lamports: amount,
        space: 1,
        programId: programId,
    });

    const instructionTOOurProgram = new TransactionInstruction({
        keys: [
            { pubkey: campaignPubKey, isSigner: false, isWritable: true },
            { pubkey: newAccount, isSigner: false, },
            { pubkey: wallet.publicKey, isSigner: true, }
        ],
        programId: programId,
        data: new Uint8Array([2])
    });


    const trans = await setPayerAndBlockhashTransaction(
        [createProgramAccount, instructionTOOurProgram]
    );
    const signature = await signAndSendTransaction(trans);
    const result = await connection.confirmTransaction(signature);
    console.log("end sendMessage", result);
}



class WithdrawRequest {
    constructor(properties) {
        Object.keys(properties).forEach((key) => {
            this[key] = properties[key];
        });
    }
    static schema = new Map([[WithdrawRequest,
        {
            kind: 'struct',
            fields: [
                ['amount', 'u64'],
            ]
        }]]);

}

export async function withdraw(
    campaignPubKey, amount
) {
    await checkWallet();
    let withdrawRequest = new WithdrawRequest({ amount: amount });
    let data = serialize(WithdrawRequest.schema, withdrawRequest);
    let data_to_send = new Uint8Array([1, ...data]);

    const instructionTOOurProgram = new TransactionInstruction({
        keys: [
            { pubkey: campaignPubKey, isSigner: false, isWritable: true },
            { pubkey: wallet.publicKey, isSigner: true, }
        ],
        programId: programId,
        data: data_to_send
    });
    const trans = await setPayerAndBlockhashTransaction(
        [instructionTOOurProgram]
    );
    const signature = await signAndSendTransaction(trans);
    const result = await connection.confirmTransaction(signature);
    console.log("end sendMessage", result);
}