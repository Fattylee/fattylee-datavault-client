import { Card, Image } from "semantic-ui-react";
import moment from "moment";

export const Post = ({
  post: {
    _id: id,
    message: body,
    owner: { firstName: username },
    createdAt,
  },
  history,
}) => {
  return (
    <Card fluid id={id}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="assets/img/avatar-datavault.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>

        <Card.Description>{body}</Card.Description>
      </Card.Content>
    </Card>
  );
};
