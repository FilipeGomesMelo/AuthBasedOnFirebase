export class Person {
    constructor (uid, name, email, role, horarios) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.horarios = horarios;
    }
    toString() {
        return this.uid + ', ' + this.name + ', ' + this.email + ', ' + this.role + ', ' + this.horarios;
    }
}

// Firestore data converter
const personConverter = {
    toFirestore: (person) => {
        return {
            uid: person.uid,
            name: person.name,
            email: person.email,
            role: person.role,
            horarios: person.horarios
            };
    },
    fromFirestore: (data) => {
        return new Person(data['uid'], data['name'], data['email'], data['role'], data['horarios']);
    }
};

export const dbApiCalls = {
    post: (person) => {
        var data = personConverter.toFirestore(person)
        db.collection('pessoa').doc(data.uid).set(data).then(() => console.log("Data successfully stored"));
    },

    get: (person) => { 
        var data;
        const pessoa = db.collection('pessoa').doc(person.uid);
        pessoa.get().then((userRecord) => data = personConverter.fromFirestore(userRecord.data()));
        return data;
    }
};
