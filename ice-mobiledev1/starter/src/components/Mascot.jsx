import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages
export default function Mascot(props) {
    const [bio, setBio] = useState(null);
    const [msg, setMsg] = useState(null);

    const displayBio = () => {
        fetch("https://cs571.org/rest/f24/ice/mascot", {
            headers: {'X-CS571-ID': "bid_f6c6fe942bcd0bd684d594e913a318732fcfd37f6651e15af0c8e88ed523fe09"}
        })
            .then(response => response.json())
            .then(data => {
            setBio(data)
            })
    }

    const handlePress = () => {
        fetch("https://cs571.org/rest/f24/ice/mascot-messages", {
            headers: {'X-CS571-ID': "bid_f6c6fe942bcd0bd684d594e913a318732fcfd37f6651e15af0c8e88ed523fe09"}
        })
            .then(response => response.json())
            .then(data => {
                setMsg(data.msg)
            })
    }

    useEffect(() => {
        displayBio();
    }, []);

    return <>
        <Text>I am a mascot!</Text>
        { 
            bio && 
            <>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{bio.name}</Text>
                <Text>{bio.quote}</Text>
                <Pressable onPress={handlePress}>
                    <Image source={{uri: bio.imgSrc}} style={{width: 200, height: 200}} />
                </Pressable>
            </>            
        }
        <Button title="pressMe!" onPress={handlePress} />
        <Text>{msg}</Text>
    </>
}