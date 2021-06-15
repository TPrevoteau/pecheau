import React from "react";
const CONFIG = require('../config');
var AWS = require("aws-sdk");

class Comments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user_email: this.props.user_email,
        value: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }

    handleSubmit(event) { 
      event.preventDefault();
      this.postComment(this.props.comms.station_id, this.state.user_email, this.state.value);
      this.setState({
        value: ''
      });
      window.location.reload(false);
      
    }

    async postComment(station_id, user_id, comment){

      AWS.config.update(CONFIG.AWS);
      let docClient = new AWS.DynamoDB.DocumentClient();

      var params = {
        TableName: "testcomments",
        Key: {
        "station_id": station_id
        }
      };
      var result = await docClient.get(params).promise();

      if (typeof result.Item === 'undefined') {
        var input = {
          "station_id": station_id,
          "comments": [
            {
             "date": new Date().toString(),
             "email": user_id,
             "text": comment
            }
           ]
        };
        
        params = {
          TableName: "testcomments",
          Item:  input
        };
  
        docClient.put(params, function (err, data) {
          if (err) {
            alert('Erreur, commentaire non posté');               
          } else {
            alert('Commentaire posté !');              
          }
        });
      } else {
        params = {
          TableName: "testcomments",
          Key: {
          "station_id": station_id
          }
        };

        let addComment = {
          "date": new Date().toString(),
          "email": user_id,
          "text": comment
          };
        result = await docClient.get(params).promise();

        let currentComments = (JSON.stringify(result.Item.comments)).slice(0, -1);
        let newComments = currentComments + "," + (JSON.stringify(addComment)) + "]";

        params = {
          TableName: "testcomments",
          Key: { "station_id": station_id },
          UpdateExpression: "set comments = :newComment",
          ExpressionAttributeValues: {
            ":newComment": JSON.parse(newComments)
          },
          ReturnValues: "UPDATED_NEW"
        };

        docClient.update(params, function (err, data) {
          if (err) {
            alert('Erreur, commentaire non posté');       
          } else {
            alert('Commentaire posté !');      
          }
        });
      } 
    }




    render() {
        if(this.props.comms != null && this.props.comms.station_id != null){
            if (this.props.comms.comments == null){
              return (
                <div className="comments">
                <h2 className="commentsTitle">Ajouter un commentaire</h2>
                <form className="postComment" onSubmit={this.handleSubmit}>
                  <textarea className="textareaComment" placeholder="Votre commentaire" value={this.state.value} onChange={this.handleChange}/>
                  <input className="submitComment" type="submit" value="Envoyer" />
                </form>
                <h2 className="commentsTitle">Commentaires</h2>
                <h3>Aucun commentaire</h3>
              </div>
                )
            }else{
              var i=0;
              return (
                <div className="comments">
                <h2 className="commentsTitle">Ajouter un commentaire</h2>
                <form className="postComment" onSubmit={this.handleSubmit}>
                <textarea className="textareaComment" placeholder="Votre commentaire" onChange={this.handleChange} />
                <input className="submitComment" type="submit" value="Envoyer" />
                </form>
                <h2 className="commentsTitle">Commentaires</h2>
                
                {this.props.comms.comments.map(comment => 
  
                  <div key={i++} className="comment">
                    <h3 className="nameComment">
                      {comment.userInfo.name}
                      
                      <img className="imgComment" src={comment.userInfo.image} alt={comment.userInfo.email} />
                    </h3>
                        
                    <p className="textComment">
                      {comment.text}
                    </p>
        

                    <small className="dateComment">le {comment.date}</small>
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