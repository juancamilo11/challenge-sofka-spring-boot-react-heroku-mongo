import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";

export const Input = ({setContent}) => {
	const editor = useRef(null)

    const handleChange = newContent => {
        //console.log(content)
    }

	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	
	return (
            <JoditEditor
            	ref={editor}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // update the content for performance reasons
                // onChange={newContent => {}}
                onChange={newContent => handleChange(newContent)}
            />
        );
}