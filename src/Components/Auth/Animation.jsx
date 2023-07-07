import { useEffect } from 'react';
import './style.css'

export default function Animation() {
    useEffect(() => {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000);
    })
    return (
        <div className='lol'>
            <h4>
                <span>Sign</span>
                <span>In</span>
            </h4>
        </div>
    )
}