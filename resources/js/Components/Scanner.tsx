import { Html5Qrcode, Html5QrcodeScanner, QrcodeSuccessCallback } from 'html5-qrcode';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

export default function Scanner() {
    const scannerRef = useRef(null);

    const successCallback: QrcodeSuccessCallback = (text, result) =>  {
        console.log(`text: ${text}, result: ${result}`)
    }

    useEffect(() => {
        const scanner = new Html5Qrcode('reader');
        scanner.start({
            facingMode: 'environment'
        }, {
            fps: 10,
            qrbox: {width: 150, height: 75},
            
        }, successCallback, () => {});

        return () => {
            if (scanner.isScanning) scanner.stop();
        }
    }, []);

    return <div id="reader" className="w-full h-full border border-gray-200 z-50"></div>
}