import { Card, Image } from "semantic-ui-react";
import moment from "moment";

export const Post = ({
  post: {
    _id: id,
    message,
    owner: { firstName },
    createdAt,
  },
}) => {
  return (
    <Card fluid id={id}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="assets/img/avatar-datavault.jpg"
        />
        <Card.Header className="text-capitalize">{firstName}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>

        <Card.Description>{message}</Card.Description>
      </Card.Content>
    </Card>
  );
};
