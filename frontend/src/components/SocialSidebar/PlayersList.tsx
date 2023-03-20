import { Box, Button, Heading, ListItem, OrderedList, Tooltip } from '@chakra-ui/react';
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
  const { friendlyName, townID, userName, userID } = useTownController();
  const sorted = players.concat([]);
  sorted.sort((p1, p2) =>
    p1.userName.localeCompare(p2.userName, undefined, { numeric: true, sensitivity: 'base' }),
  );

  const handleTeleport = (player: PlayerController) => {
    if (userID !== player.id) {
      console.log('teleporting from' + userName + ' to ' + player.userName);
    }
  };

  return (
    <Box>
      <Tooltip label={`Town ID: ${townID}`}>
        <Heading as='h2' fontSize='l'>
          Current town: {friendlyName}
        </Heading>
      </Tooltip>
      <OrderedList>
        {sorted.map(player => (
          <ListItem key={player.id}>
            <Button
              onClick={() => {
                handleTeleport(player);
              }}>
              <PlayerName player={player} />
            </Button>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
}
