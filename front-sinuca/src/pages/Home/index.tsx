import { useState } from "react";
import Card from "../../components/Card";

import vs from "../../assets/images/vs.png"
import './styles.css'

export default function Home(){

    return(
        <>
        <h1>POOL SCOREBOARD</h1>
        <div style={{ display: "flex" }}>
            <Card name="Alisson" points={69} imageUrl={"https://media.discordapp.net/attachments/551801435319173121/984511380206002277/alissonics_com_borda.png"} ></Card>
            <img src={vs} style={{alignSelf: "center", maxHeight: "250px"}}></img>
            <Card name="Tadeu" points={42} imageUrl={"https://media.discordapp.net/attachments/994301121101320252/994301163845455952/image0.jpg"}></Card>
        </div>
        </>
    )
}