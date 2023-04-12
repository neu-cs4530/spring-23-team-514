import { Box, Button, HStack, VisuallyHidden, useToast } from '@chakra-ui/react';
import React from 'react';
import useTownController from '../../hooks/useTownController';
import { useTeleportRequest } from '../../classes/TownController';
import { TeleportRequest } from '../../types/CoveyTownSocket';

/**
 * Manages notification for teleport requests: if a player receives a teleport request,
 * it will be displayed as a notification. If the player then accepts the request,
 * the player who made the request will be teleported to this player.
 */
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
                handleTeleportAccept(teleportRequest);
                onClose();
              }}>
              confirm
            </Button>
            <Button
              size='xs'
              color='red'
              onClick={() => {
                onClose();
              }}>
              deny
            </Button>
          </HStack>
        </Box>
      ),
    });
  }

  return <VisuallyHidden>Mock Element</VisuallyHidden>;
}
