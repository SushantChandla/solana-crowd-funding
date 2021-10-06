const Form = () => {

    const onSubmit = () => {
        
    }

    return (
        <form class="ui form">
            <div class="field">
                <label>Title</label>
                <input type="text" name="title" placeholder="Title" />
            </div>
            <div class="field">
                <label>Description</label>
                <input type="text" name="description" placeholder="Description" />
            </div>
            <div class="field">
                <label>Description</label>
                <input type="text" name="description" placeholder="Description" />
            </div>
            <div class="field">
                <label>Description</label>
                <input type="text" name="description" placeholder="Description" />
            </div>
            <button class="ui button" type="submit">Submit</button>
        </form>
    );
}

export default Form;