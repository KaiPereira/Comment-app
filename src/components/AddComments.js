import React from "react"
import axios from "axios"

export default function AddComments(props) {
    const [messageData, changeMessageData] = React.useState({
        comment: '',
        name: '',
        date: ''
    })
    const [messageGetData, messageGetDataChange] = React.useState([])

    function CommentChange(event) {
        changeMessageData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        }
        )
    }

    function submit(event) {
        event.preventDefault()
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const comment = {
            comment: messageData.comment,
            name: messageData.name,
            date: today
        }
        axios.post("https://mern-comment-app.herokuapp.com/add", comment)
        changeMessageData({
            comment: '',
            name: '',
            date: ''
        })
    }

    function deleteComment(id) {
        axios.delete(`https://mern-comment-app.herokuapp.com/delete/${id}`)
    }

    React.useEffect(() => {
        axios.get("https://mern-comment-app.herokuapp.com/all")
            .then(res => messageGetDataChange(res.data))
    }, [submit])

    const comments = messageGetData.map(data => {
        return (
            <div className="commentBox" key={data._id}>
                <div className="alignComment">
                    <p className="commentName">{data.name}</p>
                    <p className="commentDash">-</p>
                    <p className="commentDate">{data.date}</p>
                </div>
                <p className="comment">{data.comment}</p>
                <button onClick={() => deleteComment(data._id)} className="delete"><i className="fa-solid fa-trash-can"></i></button>
            </div>
        )
    })

    return (
        <>
            <form onSubmit={submit}>
                <input name="name" onChange={CommentChange} value={messageData.name} type="text" className="nameInput" placeholder="Name"/>
                <textarea name="comment" onChange={CommentChange} value={messageData.comment} className="commentsInput" placeholder="Comment..."></textarea>
                <input type="submit" value="Create Comment" className="sumbitButton"/>
            </form>
            {comments}
        </>
    )
}