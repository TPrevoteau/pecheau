import React, { Component } from 'react';

export class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
        codeStation: null
    };
  }


  render() {

    let comments = [];
    for (let index = 0; index < 5; index++) {
        comments.push(index);  
    }

    let renderDisplay; 
      renderDisplay = (
      <div className="comments">

          <h2 className="commentsTitle">Ajouter un commentaire</h2>
            <form className="postComment" onSubmit={this.handleSubmit}>
                <textarea className="textareaComment" placeholder="Votre commentaire" value={this.state.value} onChange={this.handleChange} />
                <input className="submitComment" type="submit" value="Envoyer" />
            </form>
          <h2 className="commentsTitle">Commentaires</h2>
          {comments}
      </div>
      
      )

    return (
        renderDisplay
    );

  }

}

export default Comments;
