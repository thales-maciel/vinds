"use client";

import _default from "next/dist/client/router";
import { useState } from "react";

type WindowData = {
    id: number;
}

function Window() {
    const [position, setPosition] = useState({ top: 100, left: 100 });
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const startDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.left,
            y: e.clientY - position.top,
        })
    }

    const stopDragging = () => {
        setIsDragging(false);
    }

    const onDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;

        const newLeft = e.clientX - dragStart.x;
        const newTop = e.clientY - dragStart.y;

        setPosition({ top: newTop, left: newLeft });
    }

    // Logic for moving and resizing the window would go here

    return (
        <div
            className="window"
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                width: size.width,
                height: size.height,
            }}
            onMouseMove={onDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
        >
            <div
                className="title-bar"
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                style={{ cursor: "move" }}
            >
                new window
                <button>X</button>
            </div>
        </div>
    );
}

function Desktop() {
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    let windowID = 0;

    const [windows, setWindows] = useState<WindowData[]>([]);

    const toggleStartMenu = () => {
        if (startMenuOpen) {
            setStartMenuOpen(false);
        } else {
            setStartMenuOpen(true);
        }
    }

    const newWindow = () => {
        const newWindow = { id: windowID++ };
        setWindows([...windows, newWindow]);
        setStartMenuOpen(false);
    }

    return (
        <main className="desktop">
            <div className="toolbar">
                <button onClick={toggleStartMenu} className="start-button">Start</button>
            </div>
            {startMenuOpen && (
                <div className="start-menu">
                    <div onClick={newWindow}>new window</div>
                </div>
            )}
            {windows.map(window => (
                <Window key={window.id} />
            ))}
        </main>
    )
}

export default function Home() {
    return (
        <Desktop />
    );
}
