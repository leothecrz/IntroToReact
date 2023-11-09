import { Outlet, Link } from "react-router-dom";

function Nav()
{
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/" > Home </Link>
                    </li>
                    <li>
                        <Link to="/ttt" > Tic-Tac-Toe </Link>
                    </li>
                    <li>
                        <Link to="/apitest" > API Test </Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default Nav;