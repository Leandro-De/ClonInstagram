import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import UserNotFound from "../UserNotFound";
import ImageNoFound from "../../assets/png/avatar.png";
import "./Profile.scss";

export default function Profile(props) {
  const { username } = props;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;
  const { getUser } = data;
  console.log(getUser);

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile_left">
          <Image src={ImageNoFound} avatar />
        </Grid.Column>
        <Grid.Column width={11} className="profile_right">
          <div>Header Profile</div>
          <div>Followers</div>
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a href={getUser.siteWeb} className="siteWeb" target="_black">
                {getUser.siteWeb}
              </a>
            )}
            {getUser.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </>
  );
}
