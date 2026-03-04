import { StyleSheet } from "react-native";

const userMenuStyles = StyleSheet.create({
    overlay: {
        flex:1,
        flexDirection:"row",
        backgroundColor: "rgba(0,0,0,0.3)",
        //justifyContent: "flex-start",
        //alignItems: "flex-end",
        //paddingTop: 90,
        //paddingRight: 15,
        //marginLeft: 20,
        //marginTop: 60,
    },
    backdrop: {
        flex: 1,
        //backgroundColor: "rgba(0,0,0,0.4)",
    },
    sideMenu: {
        width: 200,
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 40,
        elevation: 20,
    },
    menu: {
        width: 220,
        backgroundColor:"#fff",
        //borderTopLeftRadius: 25,
        //borderTopRightRadius: 25,
        borderRadius: 15,
        paddingVertical: 10,
        padding: 20,
        elevation: 10,
    },
    
    userSeccion: {
        flexDirection: "column",
        alignItems: "center",
        margin: 5
    },
    avatar:{
        width: 55,
        height: 55,
        borderRadius: 27.5,
        resizeMode: "cover",
    },
    avatarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5
    },
    avatarFallback: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
    },

    initial: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    userEmail: {
        fontSize: 13,
        color: "#666",
        marginTop: 3,
    },
    divider: {
        height: 1,
        backgroundColor: "#fff",
        marginVertical: 2,
        
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        //paddingVertical: 12,
        paddingHorizontal: 15,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight:"#500",
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "600",
        color: "#FF4D4F",
    },
    text: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default userMenuStyles;
