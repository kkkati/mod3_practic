import styled from "styled-components";
import { useLayoutEffect, useRef, useState } from "react";
import { SpecialPanel } from "../special-panel/special-panel";
import { Icon, Input } from "../../../../components";
import { sanitizeContent } from "./utils/sanitize-content";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constans";

const PostFormConteiner = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    const newConten = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newConten,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  const onImageChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);

  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        width="100%"
        placeholder="Изображение..."
        onChange={onImageChange}
      />
      <Input
        value={titleValue}
        width="100%"
        placeholder="Заголовок..."
        onChange={onTitleChange}
      />
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon id="fa-floppy-o" size="21px" margin="0 10px" onClick={onSave} />
        }
      />
      <div
        ref={contentRef}
        className="post-text"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormConteiner)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    min-height: 80px;
    border: 1px solid #000;
    font-size: 18px;
    white-space: pre-line;
  }
`;

PostForm.propTypes = {
  post: PROP_TYPE.POST.isRequired,
};
