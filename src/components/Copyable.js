
import { useState } from 'react';
import { Tooltip, Button } from '@mui/material';
import copy from "clipboard-copy";

const Copyable = ({copyText, displayText, sx}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleOnTooltipClose = () => {
        setTooltipOpen(false);
    };

    const handleOnClick = () => {
        copy(copyText);
        setTooltipOpen(true);
    };

    return (
        <Tooltip
            open={tooltipOpen}
            title="Copied to clipboard"
            leaveDelay={500}
            onClose={handleOnTooltipClose}
        >
            <Button 
                variant="text" 
                size='small' 
                color='text'
                sx={{
                    padding: 0,
                    ...sx
                }}
                onClick={handleOnClick}
            >
                {displayText}
            </Button>
        </Tooltip>
    )
}

export default Copyable;