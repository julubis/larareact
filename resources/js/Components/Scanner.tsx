// import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
// import { PropsWithChildren, useEffect, useRef, useState } from 'react';

// export default function Scanner({active = false}: PropsWithChildren<{active?: boolean}>) {
//     const scannerRef = useRef(null);

//     useEffect(() => {
//         const scanner = new Html5Qrcode('scanner');

//         scanner.start({
//             facingMode: 'user',
//             {
//                 qrbox: 250,
//                 fps: 10
//             }, ((text, result) => {
//                 console.log(text, result)
//             }, () => {})
//         })

//         scanner.render((text, result) => {
//             console.log(text, result)
//         }, () => {})

//         return () => {
//             scanner.clear();
//         }
//     }, []);

//     return <div id="scanner" className="w-48 h-48" ref={scannerRef}></div>
// }