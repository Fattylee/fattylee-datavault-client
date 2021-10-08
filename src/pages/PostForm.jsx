import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Ref } from "semantic-ui-react";
import { FormContext } from "../context/postForm";
import { APIClient } from "../utils/APIClient";

const initialValue = {
  message: "",
};

export const PostForm = ({ history }) => {
  const { setError, error, setValue, value, handleInput } =
    useContext(FormContext);

  const [loading, setLoading] = useState(false);
  const textArea = useRef(null);

  useEffect(() => {
    if (value?.id) {
      const box = textArea.current.querySelector("textarea");
      const len = box.value.length;
      box?.focus();
      box?.setSelectionRange(len, len);
    }
  }, [value]);

  function submitPost(e) {
    e.preventDefault();
    // addNewPost();
    setLoading(true);
    APIClient.post("/posts", { message: value.message })
      .then(() => {
        setError({});
        setValue(initialValue);

        history.push("/");
      })
      .catch((error) => {
        console.log("error", error.message);
        setError(error.message);
        if (error.status === "BAD_USER_INPUT") {
          return setError(error?.response?.data);
        }
        setError({ error: error.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form loading={loading} size="big" onSubmit={submitPost}>
      <Ref innerRef={textArea}>
        <Form.TextArea
          label="What's on your mind?"
          placeholder="What's happening?"
          name="message"
          value={value.message}
          onChange={handleInput}
          error={error.message}
          id="textArea"
        />
      </Ref>
      <Button
        loading={loading}
        disabled={loading || !value.message?.length}
        color="blue"
      >
        Add post
      </Button>
      <Button
        content="Cancel"
        disabled={!value.message?.length}
        color="teal"
        type="button"
        onClick={() => {
          setValue({ message: "" });
        }}
      />
    </Form>
  );
};

function focusAndBlink(value) {
  const updatedPost = document.getElementById(value.id);
  updatedPost?.querySelector("button")?.focus();
  updatedPost?.classList.add("my-flash");
  setTimeout(() => {
    // remove animation after 3s
    updatedPost?.classList.remove("my-flash");
  }, 3000);
}
