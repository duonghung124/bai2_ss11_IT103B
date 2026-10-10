const devices = [
    {
        id: "DEV_001",
        name: "Dieu hoa",
        room: "Phong khach",
        isActive: true,
        powerWatts: 1500
    },
    {
        id: "DEV_002",
        name: "Den ngu",
        room: "Phong ngu",
        isActive: true,
        powerWatts: 20
    },
    {
        id: "DEV_003",
        name: "Quat dien",
        room: "Phong khach",
        isActive: true,
        powerWatts: 75
    }
];

let nextDeviceId = 4;

const validateDevice = (newDev) => {
    if (newDev === null || typeof newDev !== "object") {
        return false;
    }

    if (typeof newDev.name !== "string" || newDev.name.trim() === "") {
        return false;
    }

    if (typeof newDev.room !== "string" || newDev.room.trim() === "") {
        return false;
    }

    if (
        typeof newDev.powerWatts !== "number" ||
        newDev.powerWatts <= 0 ||
        !Number.isFinite(newDev.powerWatts)
    ) {
        return false;
    }

    return true;
};

const createDevice = (list, newDev) => {
    if (!Array.isArray(list) || validateDevice(newDev) === false) {
        console.log("Du lieu thiet bi khong hop le!");
        return null;
    }

    const device = {
        id: "DEV_" + String(nextDeviceId).padStart(3, "0"),
        name: newDev.name.trim(),
        room: newDev.room.trim(),
        isActive: newDev.isActive === undefined ? true : newDev.isActive,
        powerWatts: newDev.powerWatts
    };

    if (typeof device.isActive !== "boolean") {
        console.log("Trang thai thiet bi phai la true hoac false!");
        return null;
    }

    list.push(device);
    nextDeviceId++;

    console.log("Them thiet bi thanh cong: " + device.id);

    return device;
};

const readDevicesByRoom = (list, roomName) => {
    const result = [];

    if (!Array.isArray(list) || typeof roomName !== "string") {
        return result;
    }

    for (let i = 0; i < list.length; i++) {
        if (
            typeof list[i].room === "string" &&
            list[i].room.toLowerCase() === roomName.trim().toLowerCase()
        ) {
            result.push(list[i]);
        }
    }

    return result;
};

const updateDevice = (list, id, updateData) => {
    if (
        !Array.isArray(list) ||
        updateData === null ||
        typeof updateData !== "object"
    ) {
        return false;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            if (
                updateData.name !== undefined &&
                (typeof updateData.name !== "string" ||
                    updateData.name.trim() === "")
            ) {
                return false;
            }

            if (
                updateData.room !== undefined &&
                (typeof updateData.room !== "string" ||
                    updateData.room.trim() === "")
            ) {
                return false;
            }

            if (
                updateData.powerWatts !== undefined &&
                (typeof updateData.powerWatts !== "number" ||
                    updateData.powerWatts < 0 ||
                    !Number.isFinite(updateData.powerWatts))
            ) {
                return false;
            }

            if (
                updateData.isActive !== undefined &&
                typeof updateData.isActive !== "boolean"
            ) {
                return false;
            }

            if (updateData.name !== undefined) {
                list[i].name = updateData.name.trim();
            }

            if (updateData.room !== undefined) {
                list[i].room = updateData.room.trim();
            }

            if (updateData.isActive !== undefined) {
                list[i].isActive = updateData.isActive;
            }

            if (updateData.powerWatts !== undefined) {
                list[i].powerWatts = updateData.powerWatts;
            }

            console.log("Cap nhat thiet bi thanh cong: " + id);
            return true;
        }
    }

    console.log("Khong tim thay thiet bi: " + id);
    return false;
};

const deleteDevice = (list, id) => {
    if (!Array.isArray(list)) {
        return false;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            console.log("Xoa thiet bi thanh cong: " + id);
            return true;
        }
    }

    console.log("Khong tim thay thiet bi can xoa: " + id);
    return false;
};

console.log("===== TEST CREATE =====");

createDevice(devices, {
    name: "Den thong minh",
    room: "Phong ngu",
    isActive: true,
    powerWatts: 12
});

createDevice(devices, {
    name: "",
    room: "Phong khach",
    powerWatts: 100
});

console.log("");
console.log("===== TEST READ =====");

const livingRoomDevices = readDevicesByRoom(devices, "Phong khach");
console.log(livingRoomDevices);

console.log("");
console.log("===== TEST UPDATE =====");

console.log(
    "Tat dieu hoa:",
    updateDevice(devices, "DEV_001", {
        isActive: false
    })
);

console.log(
    "Dat cong suat quat ve 0W:",
    updateDevice(devices, "DEV_003", {
        powerWatts: 0
    })
);

console.log(
    "Cap nhat ID khong ton tai:",
    updateDevice(devices, "DEV_999", {
        isActive: false
    })
);

console.log("");
console.log("===== TEST DELETE =====");

console.log("Ket qua xoa:", deleteDevice(devices, "DEV_002"));
console.log("Ket qua xoa ID khong ton tai:", deleteDevice(devices, "DEV_999"));

console.log("");
console.log("===== DANH SACH THIET BI SAU CUNG =====");
console.table(devices);