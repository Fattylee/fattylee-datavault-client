import { useEffect, useState } from "react";
import { Grid, Loader, Transition } from "semantic-ui-react";
import { Post } from "../components/Post";
import { useAuthState } from "../context/auth";
import { useViewpoint } from "../utils/hooks";
import { PostForm } from "./PostForm";
import { APIClient } from "../utils/APIClient";

export const Home = (props) => {
  const screen = useViewpoint();
  const { isAuthenticated } = useAuthState();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    APIClient.get("/posts")
      .then((res) => {
        const {
          data: { result },
        } = res;
        console.log({ result });
        setPosts(result);
      })
      .catch((err) => {
        console.log("error", err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, []);

  if (error) return <h1>Error page</h1>;
  return (
    <Grid fluid="true">
      <Grid.Row centered>
        <h2>Recent posts</h2>
      </Grid.Row>

      <Grid.Row columns={screen === "mobile" ? 1 : screen === "tablet" ? 2 : 3}>
        {isAuthenticated && (
          <Grid.Column style={{ marginBottom: 20 }}>
            {" "}
            <PostForm {...props} />{" "}
          </Grid.Column>
        )}
        {loading ? (
          <Loader active size="massive"></Loader>
        ) : posts?.length ? (
          <>
            <Transition.Group>
              {posts?.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <Post post={post} {...props} />
                </Grid.Column>
              ))}
            </Transition.Group>
          </>
        ) : (
          <h1>Nothing to see here...yet.</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};
