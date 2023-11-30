import { Box, Flex, Link, Text } from '@chakra-ui/react';

import { Banner } from '@/components/Banner';
import { CallToAction } from '@/components/CallToAction';
import { PhotoList } from '@/components/PhotoList';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => (
  <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
    <Box margin="8">
      <Flex as="header" width="full" align="center">
        <Box marginLeft="auto">
          <ThemeToggle />
        </Box>
      </Flex>
      <Box as="main" marginY={22}>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          minHeight="70vh"
          gap={4}
          mb={8}
          w="full"
        >
          <Banner />
          <CallToAction />
          <PhotoList />
        </Flex>
      </Box>
      <Flex as="footer" width="full" justifyContent="center">
        <Text fontSize="sm">
          {new Date().getFullYear()} -{' '}
          <Link
            href="https://github.com/vousmeevoyez?tab=repositories"
            isExternal
            rel="noopener noreferrer"
          >
            kelvindsmn
          </Link>
        </Text>
      </Flex>
    </Box>
  </Box>
);

export default Index;
