import { Button, Heading, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import ConversationAreasList from './ConversationAreasList';
import PlayersList from './PlayersList';
import useTownController from '../../hooks/useTownController';

export default function SocialSidebar(): JSX.Element {
  const townController = useTownController();

  const handleTeleportBack = () => {
    townController.emitTeleportBack();
  };

  return (
    <VStack
      align='left'
      spacing={2}
      border='2px'
      padding={2}
      marginLeft={2}
      borderColor='gray.500'
      height='100%'
      divider={<StackDivider borderColor='gray.200' />}
      borderRadius='4px'>
      <Heading fontSize='xl' as='h1'>
        Players In This Town
      </Heading>
      <Button
        color='blue'
        onClick={() => {
          console.log('teleport back');
          handleTeleportBack();
        }}>
        Teleport Back
      </Button>
      <PlayersList />
      <ConversationAreasList />
    </VStack>
  );
}
