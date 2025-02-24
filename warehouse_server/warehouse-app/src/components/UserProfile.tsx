import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

const UserProfile: React.FC = () => {
  const user = {
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    group: "Студент",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Card>
      <CardContent>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Группа: {user.group}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
