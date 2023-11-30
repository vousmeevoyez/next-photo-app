import { Grid, Heading, Text } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        Simple Photo App
      </Heading>

      <Text fontSize="xs">
        Upload a photo, add a comment and Display all uploaded photos and its
        comments
      </Text>
    </Grid>
  );
};

export { Banner };
