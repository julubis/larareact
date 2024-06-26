import { Html5Qrcode, QrcodeSuccessCallback } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

export default function Scanner() {
    const scannerRef = useRef(null);

    const successCallback: QrcodeSuccessCallback = (text, result) =>  {
        window.alert(`text: ${text}, result: ${result}`)
    }

    useEffect(() => {
        const scanner = new Html5Qrcode('qrcode-reader');
        scanner.start({
            facingMode: 'environment'
        }, {
            fps: 80,
            // qrbox: 250
            qrbox: (viewWidth, viewHeight) => {
                const edgePercentage = 0.7;
                const minEdge = Math.min(viewWidth, viewHeight);
                const size = Math.floor(minEdge * edgePercentage);
                return {
                    width: size,
                    height: size
                }
            }
            
        }, successCallback, () => {});

        return () => {
            if (scanner.isScanning) scanner.stop();
        }
    }, []);

    return <div id="qrcode-reader" ref={scannerRef} className="w-96 h-96 border border-gray-200 z-50"></div>
}