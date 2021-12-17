import {makeStyles} from "@mui/styles";

const useHomeStyles = makeStyles((theme: any) => ({
    wrapper: {
        height: "100vh"
    },
    sideMenu: {
        position: "sticky",
        top: 0,
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    sideMenuItem: {
        display: "flex",
        marginBottom: 5,
        marginTop: 5,
        "& a": {
            color: 'black',
            textDecoration: 'none',
        },
        "&:hover": {
            "& div": {
                backgroundColor: "rgba(29,161,242,0.1)",
                cursor: 'pointer',
                "& h6": {
                    color: theme.palette.primary.main,
                },
                "& svg": {
                    fill: theme.palette.primary.main,
                },
            },
        },
        "& div": {
            display: "inline-flex",
            borderRadius: 30,
            alignItems: "center",
            transition: "background-color 0.1s ease-in-out",
            padding: "0 25px 0 15px",
            height: 50,
            "& h6": {
                paddingLeft: 20
            },
        },
    },
    mainTweet: {
        display: "flex",
        alignItems: "center",
        "& h6": {
            marginLeft: 15,
        },
    },
}));

export default useHomeStyles;