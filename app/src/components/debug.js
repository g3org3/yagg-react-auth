import React from 'react';
export default (props) => (<pre style={{ background: '#000',color: 'white' }}>{ JSON.stringify(props, null, 2) }</pre>)