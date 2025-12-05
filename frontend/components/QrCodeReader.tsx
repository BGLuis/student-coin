"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrCodeReaderProps {
    onScanSuccess: (decodedText: string) => void;
    onScanFailure?: (error: string) => void;
}

const QrCodeReader = ({ onScanSuccess, onScanFailure }: QrCodeReaderProps) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        const elementId = "html5qr-code-full-region";
        
        // Prevent double initialization
        if (scannerRef.current) {
            return;
        }

        const scanner = new Html5QrcodeScanner(
            elementId,
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            /* verbose= */ false
        );
        
        scannerRef.current = scanner;
        
        scanner.render(
            (decodedText) => {
                onScanSuccess(decodedText);
            }, 
            (error) => {
                if (onScanFailure) onScanFailure(error);
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode scanner. ", error);
                });
                scannerRef.current = null;
            }
        };
    }, [onScanSuccess, onScanFailure]);

    return <div id="html5qr-code-full-region" className="w-full" />;
};

export default QrCodeReader;
