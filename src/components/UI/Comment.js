import React, {useEffect, useState} from "react";

const Comment = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('email не корректен');
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('Добавьте текст');
  const [emailDirty, setEmailDirty] = useState(false);
  const [commentDirty, setCommentDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (emailError || commentError) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [emailError, commentError])

  const blurHandler = ({target}) => {
    console.log(target.name)
    if (target.name === 'email') {
      setEmailDirty(true);
    }

    if (target.name === 'comment') {
      setCommentDirty(true);
    }
  }

  const emailHandler = ({target}) => {
    setEmail(target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(target.value).toLowerCase())) {
      setEmailError('email не корректен');
    } else {
      setEmailError('')
    }
  }

  const commentHandler = ({target}) => {
    setComment(target.value);
    if (target.value.length < 3) {
      setCommentError('Добавьте текст');
      if (!target.value) {
        setCommentError('Комментарий не должен быть пустым');
      }
    } else {
      setCommentError('');
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setEmail('');
    setComment('');
  }

  return (
    <form className="form-comment" onSubmit={submitHandler}>
      <div className="form-comment__wrap form-comment__wrap--email">
        <input
          className="form-comment__input form-comment__input--email"
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={({target}) => emailHandler({target})}
          onBlur={({target}) => blurHandler({target})}
          name="email"
        />
        {(emailDirty && emailError) && <span className="form-comment__error">{emailError}</span>}
      </div>
      <div className="form-comment__wrap form-comment__wrap--area">
      <textarea
        className="form-comment__input form-comment__input--area"
        value={comment}
        onChange={({target}) => commentHandler({target})}
        placeholder="Напишите комментарий"
        onBlur={({target}) => blurHandler({target})}
        name="comment"
      />
        {(commentDirty && commentError) && <span className="form-comment__error">{commentError}</span>}
      </div>
      <div className="form-comment__wrap form-comment__wrap--btn">
        <button className="btn form-comment__btn" disabled={!isValid} type='submit'>Комментировать</button>
      </div>
    </form>
  )
}

export default Comment
