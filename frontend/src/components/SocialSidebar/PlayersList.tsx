import {
  Box,
  Button,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Tooltip,
  useToast,
  ToastId,
} from '@chakra-ui/react';
import React from 'react';
import PlayerController from '../../classes/PlayerController';
import { usePlayers } from '../../classes/TownController';
import useTownController from '../../hooks/useTownController';
import PlayerName from './PlayerName';

/**
 * Lists the current players in the town, along with the current town's name and ID
 *
 * See relevant hooks: `usePlayersInTown` and `useCoveyAppState`
 *
 */
export default function PlayersInTownList(): JSX.Element {
  const players = usePlayers();
  const townController = useTownController();
  const sorted = players.concat([]);
  const toast = useToast();
  sorted.sort((p1, p2) =>
    p1.userName.localeCompare(p2.userName, undefined, { numeric: true, sensitivity: 'base' }),
  );

  const handleTeleport = (player: PlayerController) => {
    townController.emitTeleport(player);
  };

  return (
    <Box>
      <Tooltip label={`Town ID: ${townController.townID}`}>
        <Heading as='h2' fontSize='l'>
          Current town: {townController.friendlyName}
        </Heading>
      </Tooltip>
      <OrderedList>
        {sorted.map(player => (
          <ListItem key={player.id}>
            <Button
              onClick={() =>
                toast({
                  position: 'bottom-left',
                  duration: 10000,
                  render: ({ onClose }) => (
                    <Box color='white' p={3} bg='blue.500'>
                      Would you like to teleport to {player.userName}?
                      <HStack>
                        <Button
                          size='xs'
                          color='green'
                          onClick={() => {
                            console.log('accept teleport confirm');
                            handleTeleport(player);
                          }}>
                          confirm
                        </Button>
                        <Button size='xs' color='red' onClick={onClose}>
                          deny
                        </Button>
                      </HStack>
                    </Box>
                  ),
                })
              }>
              <PlayerName player={player} />
            </Button>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
}
