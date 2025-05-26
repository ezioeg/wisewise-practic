import { medicData, pacientData } from "@/src/mockData";
import { MedicalInfoItemProps, MedicCardProps } from "@/src/types";
import { LABELS } from "@/src/utils/constants";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./styles";

const MedicalInfoItem = ({ label, value }: MedicalInfoItemProps) => (
    <Text style={styles.medicalDetail}>
        <Text style={styles.medicalLabel}>{label}: </Text>
        <Text style={styles.medicalValue}>{value}</Text>
    </Text>
);

export default function MedicCard({
    options,
    selectedValue,
    setSelectedValue,
}: MedicCardProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{medicData.area}</Text>
                    <Text style={styles.headerSubtitle}>{medicData.name}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../../assets/images/card-icon.png")}
                        style={styles.iconImage}
                    />
                </View>
            </View>

            {/* Body */}
            <View style={styles.cardBody}>
                <View style={styles.patientInfo}>
                    <Image
                        source={require("../../../assets/images/pacient-icon.png")}
                        style={styles.patientImage}
                    />
                    <View style={styles.patientTextContainer}>
                        <Text style={styles.patientName}>
                            {pacientData.name}
                        </Text>
                        <Text style={styles.patientAge}>
                            {pacientData.age} años
                        </Text>
                    </View>
                </View>
                <View style={styles.medicalInfo}>
                    <MedicalInfoItem
                        label={LABELS.file}
                        value={pacientData.file}
                    />
                    <MedicalInfoItem
                        label={LABELS.diagnosis}
                        value={pacientData.diagnosis}
                    />
                    <MedicalInfoItem
                        label={LABELS.intervention}
                        value={pacientData.intervention}
                    />
                    <MedicalInfoItem
                        label={LABELS.preAnestheticEvaluation}
                        value={pacientData.preAnestheticEvaluation}
                    />
                    <MedicalInfoItem
                        label={LABELS.requestTime}
                        value={pacientData.requestTime}
                    />
                    <MedicalInfoItem
                        label={LABELS.suspensions}
                        value={pacientData.suspensions}
                    />

                    <View style={[styles.medicalDetail, styles.imageRow]}>
                        <Image
                            source={require("../../../assets/images/cardio-icon.png")}
                            style={styles.medicalImage}
                        />
                        <Image
                            source={require("../../../assets/images/anestesia-icon.png")}
                            style={styles.medicalImage}
                        />
                    </View>
                </View>
            </View>

            {/* Dropdown */}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Tipo de Urgencia</Text>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.dropdownButtonText}>
                        {selectedValue || "Seleccionar"}
                    </Text>
                </TouchableOpacity>

                {/* Modal with options */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={styles.optionItem}
                                        onPress={() => handleSelect(item.name)}
                                    >
                                        <Text style={styles.optionText}>
                                            {item.name}
                                        </Text>
                                    </Pressable>
                                )}
                            />
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
