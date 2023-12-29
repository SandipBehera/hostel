import React, { Fragment, useState } from 'react';
// import { Btn, ToolTip } from '../../../../AbstractElements';
import { Btn, ToolTip } from '../../AbstractElements';
 
const StudentTooltip = ({ item }) =>{
 
    const [tooltip, setTooltip] = useState(false);
    const toggle = () => setTooltip(!tooltip);
 
    return(
      <Fragment>
       
        <ToolTip
            attrToolTip={{
                placement:item.placement,
            isOpen:tooltip,
            target:'Tooltip-' + item.id,
            toggle:toggle }} >
          {item.tooltip}
        </ToolTip>
      </Fragment>
    );
};
 
export default StudentTooltip;