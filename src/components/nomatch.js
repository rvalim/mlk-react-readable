import React from 'react';
import {Alert} from 'react-bootstrap'

export default function NoMatch(props) {
    const {location} = props
    console.log(props)
    return (
        <Alert variant="danger" className="text-center">
            <h3>Page not Found</h3>
            <code>{location.pathname}</code>
        </Alert>
    )
}