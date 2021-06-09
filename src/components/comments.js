import React from "react";

class Comments extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        console.log(this.props.comms);
        var shouldLoad = this.props.comms.length > 0;
        if(shouldLoad){
            return (
            <div className="comments">
            <h2 className="commentsTitle">Ajouter un commentaire</h2>
            <form className="postComment" onSubmit={this.handleSubmit}>
            <textarea className="textareaComment" placeholder="Votre commentaire" onChange={this.handleChange} />
            <input className="submitComment" type="submit" value="Envoyer" />
            </form>
            <h2 className="commentsTitle">Commentaires</h2>
            <h1>{this.props.comms[0]}</h1>
          </div>
            )
          }else{
            return (
            <div className="comments">
            <h2 className="commentsTitle">Veuillez selectionner une station</h2>
            </div>
            )
          }
    }
  }

  export default Comments;