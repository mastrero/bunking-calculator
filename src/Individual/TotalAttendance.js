import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";

function TotalAttendance(props) {
	let percentage = () => {
		let attended = 0;
		let total = 0;
		Object.keys(props.data).map((key) => {
			attended += props.data[key]["attended"];
			total += props.data[key]["total"];
		});
		return ((attended / total) * 100).toFixed(1);
	};
	let percent = percentage();
	if (isNaN(percent)) {
		percent = 0;
	}
	let textToDisplay = "";
	if (+percent >= 75 && +percent < 90) {
		textToDisplay = "Keep up the pace 🎉🎉. However you can bunk a few classes today. 😉";
	} else if ((+percent < 75) & (+percent >= 70)) {
		textToDisplay = "You are at the edge of safe zone 🤨, Please go to class to increase the attendance.";
	} else if ((+percent < 70) & (+percent >= 60)) {
		textToDisplay = "Attend the classes 🤨, to be in safe zone";
	} else if (+percent >= 90) {
		textToDisplay = "You are too overloaded with attendance 😲. Over attendance is painful.";
	} else {
		textToDisplay = "OH OH 😓😓 !! You are too low on attendance, please do not bunk the classes.";
	}
	return (
		<View style={{ ...styles.rectangle, flexDirection: "row" }}>
			<View style={{ flex: 1 }}>
				<Text style={styles.lead}>Your Total Attendance:</Text>
				<Text style={{ textAlign: "justify", color: "black" }}>{textToDisplay}</Text>
			</View>
			<View style={styles.right}>
				<ProgressCircle
					percent={+percent}
					radius={45}
					borderWidth={3}
					color='#000'
					shadowColor='#eee'
					bgColor='#fff'>
					<Text style={{ fontSize: 20, color: "black" }}>{+percent}%</Text>
				</ProgressCircle>
			</View>
		</View>
	);
}

export default TotalAttendance;

const styles = StyleSheet.create({
	rectangle: {
		width: "93%",
		padding: 15,
		alignSelf: "center",
		...Platform.select({
			android: {
				elevation: 3,
			},
		}),
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	lead: {
		paddingVertical: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
	},
	right: {
		flex: 1,
		flexGrow: 0.8,
		justifyContent: "center",
		alignItems: "center",
	},
});
