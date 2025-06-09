import PDSideBar from "../components/Header/PDSideBar";
import PDTopBar from "../components/Header/PDTopBar";

export default function PDHome() {
    return (
        
        <div className="d-flex min-vh-100" style={{ margin: '-16px -16px ' }}>
            {/* Left side: sidebar */}
            <PDSideBar />

            {/* Right side: main content */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* TopBar: fixed or relative to the right */}
                <PDTopBar />

                {/* Main page content here */}
                <main className="p-4">
                    {/* ... */}
                </main>
            </div>
        </div>





        
    );
}