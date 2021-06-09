import React from "react";

class Comments extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      console.log(this.props.comms);
        if(this.props.comms != null){
            if (this.props.comms.length < 1){
              return (
                <div className="comments">
                <h2 className="commentsTitle">Ajouter un commentaire</h2>
                <form className="postComment" onSubmit={this.handleSubmit}>
                <textarea className="textareaComment" placeholder="Votre commentaire" onChange={this.handleChange} />
                <input className="submitComment" type="submit" value="Envoyer" />
                </form>
                <h2 className="commentsTitle">Commentaires</h2>
                <h3>Aucun commentaire</h3>
              </div>
                )
            }else{
              return (
                <div className="comments">
                <h2 className="commentsTitle">Ajouter un commentaire</h2>
                <form className="postComment" onSubmit={this.handleSubmit}>
                <textarea className="textareaComment" placeholder="Votre commentaire" onChange={this.handleChange} />
                <input className="submitComment" type="submit" value="Envoyer" />
                </form>
                <h2 className="commentsTitle">Commentaires</h2>
                
                {this.props.comms.map(comment => 
  
                  <div className="comment">
                    
                    <h3 className="nameComment">
                      {comment.userInfo.name}
                      <img className="imgComment" src={comment.userInfo.image} alt={comment.userInfo.email} />
                    </h3>
                    <p className="textComment">
                      {comment.text}
                    </p>
                  </div>)}
               
              </div>
                )
            }
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