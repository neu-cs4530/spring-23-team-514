import { Box, Button, HStack, VisuallyHidden, useToast } from '@chakra-ui/react';
import React from 'react';
import useTownController from '../../hooks/useTownController';
import { useTeleportRequest } from '../../classes/TownController';
import { TeleportRequest } from '../../types/CoveyTownSocket';

export default function TeleportManager(): JSX.Element {
  const townController = useTownController();
  const { ourPlayer } = useTownController();
  const toast = useToast();
  const teleportRequest = useTeleportRequest();

  const handleTeleportAccept = (acceptedRequest: TeleportRequest) => {
    townController.emitTeleportAccept(acceptedRequest);
  };

  if (teleportRequest && teleportRequest.to.id === ourPlayer.id) {
    const { from } = teleportRequest;
    console.log('should toast');
    toast({
      position: 'bottom-left',
      duration: 10000,
      render: ({ onClose }) => (
        <Box color='white' p={3} bg='blue.500'>
          {from.userName} is trying to teleport to you. Would you like to accept?
          <HStack>
            <Button
              size='xs'
              color='green'
              onClick={() => {
                console.log('accept teleport request');
                handleTeleportAccept(teleportRequest);
                onClose();
              }}>
              confirm
            </Button>
            <Button
              size='xs'
              color='red'
              onClick={() => {
                console.log('denied teleport request');
                onClose();
              }}>
              deny
            </Button>
          </HStack>
        </Box>
      ),
    });
  } else if (!teleportRequest) {
    console.log('teleport request undefined');
  } else {
    console.log('teleport request not addressed to our player');
  }

  return <VisuallyHidden>Mock Element</VisuallyHidden>;
}
