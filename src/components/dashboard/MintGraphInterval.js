import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const MintGraphInterval = ({intervals, displayInterval, setDisplayInterval}) => {

    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            {
                intervals.map(interval => (
                    <Button
                        key={interval}
                        onClick={() => setDisplayInterval(interval)}
                        color={displayInterval === interval ? 'primary' : 'text'}
                    >
                        Last {interval}
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}

export default MintGraphInterval