import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import router from '@/router'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        LoadingDataKorisnickiPanel: true,
        LoadingDataCenovnik: true,
        LoadingDataNajcescaPitanja: true,
        LoadingDataObavestenja: false,
        LoadingDataUslugeCena: false,
        LoadingDataUnosNajcescihPitanja: false,
        Intro: true,
        IsLoggedIn: false,
        PodaciKorisnika: Object, //u action: LoginUser  postoji komanda koja salje objekat UserData u PodaciKorisnika 
        UserDataAdvance: [],
        RegisterDialog: false,
        LoginDialog: false,
        LoadingButton: false,
        DisabledButton: false,
        snackbarBoolean: false,
        snackbar_message: "",
        snackbar_color: "",
        sva_obavestenja: [],
        sva_najcesca_pitanja: [],
        grupa_cena: [],
        grupa_nudimo: [],
        brojObavestenja: 10,
        promenaSifreDialog: false
    },
    mutations: {
        SVA_OBAVESTENJA: (state, payload) => {
            Vue.set(state, 'sva_obavestenja', payload); //ovako se push-uje array u VUEX
        },
        SVA_NAJCESCA_PITANJA: (state, payload) => {
            Vue.set(state, 'sva_najcesca_pitanja', payload)
        },
        GRUPA_CENA: (state, payload) => {
            Vue.set(state, 'grupa_cena', payload); //ovako se push-uje array u VUEX
        },
        USER_DATA(state, payload) {
            state.PodaciKorisnika = payload
        },
        USER_DATA_ADVANCE: (state, payload) => {
            Vue.set(state, 'UserDataAdvance', payload)
        },
        IS_LOGGED_IN(state, payload) {
            state.IsLoggedIn = payload.IsLoggedIn //obratiti paznju na mala pocetna slova i na velika na isLoggedIn i IsLoggedIn
        },
        SET_LOGIN_DIALOG: (state, newValue) => {
            state.LoginDialog = newValue
        },
        SET_REGISTER_DIALOG: (state, newValue) => {
            state.RegisterDialog = newValue
        },
        BUTTONS(state, payload) {
            state.LoadingButton = payload.LoadingButton
            state.DisabledButton = payload.DisabledButton

        },
        TOOGLE_SNACKBAR(state, payload) {
            state.snackbarBoolean = payload.boolean
            state.snackbar_message = payload.message
            state.snackbar_color = payload.color
        },
        GRUPA_NUDIMO: (state, payload) => {
            Vue.set(state, 'grupa_nudimo', payload); //ovako se push-uje array u VUEX
        }
    },
    getters: {
        Lista_obavestenja: (state) => {
            return state.sva_obavestenja
        },
        Lista_najcescih_pitanja: (state) => {
            return state.sva_najcesca_pitanja
        },
        Lista_grupa_cena: (state) => {
            return state.grupa_cena
        },
        PodaciKorisnika: (state) => {
            return state.PodaciKorisnika
        },
        IsLoggedIn: (state) => {
            return state.IsLoggedIn
        },
        RegisterDialog: (state) => {
            return state.RegisterDialog
        },
        LoginDialog: (state) => {
            return state.LoginDialog
        },
        UserDataAdvance: (state) => {
            return state.UserDataAdvance
        },
        Lista_grupa_nudimo: (state) => {
            return state.grupa_nudimo
        },

    },
    actions: {
        LoginUser({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;

            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    firebase.auth().onAuthStateChanged((user) => {
                        //ako je true...tj. ako je korisnik logovan
                        if (user) {
                            var UserData = firebase.auth().currentUser; //UserData je naziv objekta u kome su podaci !!!!!!!!!!!!!
                            //kada bi smo stavili samo firebase.auth().currentUser onda bi poslao ceo objekat sa raznim informacijama
                            commit("IS_LOGGED_IN", {
                                    IsLoggedIn: true, //obratiti paznju na mala pocetna slova
                                }),
                                commit("USER_DATA", {
                                    UserData
                                })
                        }
                        //ako je false tj. ako korisnik nije logovan
                        else {
                            commit("IS_LOGGED_IN", {
                                IsLoggedIn: false //obratiti paznju na mala pocetna slova kod IsLoggedIn
                                    //mada ovo ni ne treba zato sto je defaultno false...znaci ako se niko ne loguje i dalje je false
                            })
                        }
                    })
                    commit('TOOGLE_SNACKBAR', {
                        boolean: true,
                        message: "Uspešno ste se logovali !",
                        color: 'success'
                    });
                    setTimeout(() => {
                        commit("SET_LOGIN_DIALOG", false);
                        router.push({ path: '/home' })
                    }, 500);
                })
                .catch(error => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode)

                    if (errorCode == 'auth/invalid-email') {
                        if (this.state.snackbarBoolean == true) {
                            this.state.snackbarBoolean = false
                        }
                        payload = {
                            boolean: true,
                            message: "E-mail koji ste uneli nije validan !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/user-disabled') {
                        payload = {
                            boolean: true,
                            message: "E-mail koji ste uneli je trenutno blokiran !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/user-not-found') {
                        payload = {
                            boolean: true,
                            message: "E-mail koji ste uneli nije registrovan !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/wrong-password') {
                        payload = {
                            boolean: true,
                            message: "Šifra koju ste uneli se ne poklapa sa e-mailom",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)

                    } else {
                        console.log(errorMessage)
                    }
                });



        },
        setIsLoggedIn: ({ commit }, UserData) => {
            commit("IS_LOGGED_IN", {
                    IsLoggedIn: true, //obratiti paznju na mala pocetna slova
                }),
                commit("USER_DATA", {
                    UserData
                })
        },
        setLoginDialog: ({ commit }, newValue) => {
            commit('SET_LOGIN_DIALOG', newValue)
                // return state.LoginDialog
        },
        setRegisterDialog: ({ commit }, newValue) => {
            commit('SET_REGISTER_DIALOG', newValue)
        },

        //izvlacenje podataka korisnika tj GET
        UserDataAdvance({ commit }) {
            let Data = firebase.auth().currentUser
                //GET USER UID
            var userUID = Data.uid;
            var UserEmail = Data.email
                //OVDE IZVLACIMO PODATKE KOJI SU VEZANI ZA UID KOJI SE UPRAVO LOGOVAO
            firebase.firestore().collection('users').doc(userUID).get().then((userSnapshot) => {
                if (userSnapshot.exists) {
                    let DataAdvance = userSnapshot.data()
                    commit("USER_DATA_ADVANCE", {
                        ime: DataAdvance.ime,
                        prezime: DataAdvance.prezime,
                        admin: DataAdvance.admin,
                        email: UserEmail
                    })
                } else {
                    console.log('Ne postoji dodatna dokumentacija za logovanog korisnika')
                }
            }).then(() => {
                //da zaustavi v-circular nakon ocitavanja podataka
                this.state.LoadingDataKorisnickiPanel = false
            })
        },
        Snackbar_Message({ commit }, payload) {
            commit('TOOGLE_SNACKBAR', payload)
        },
        // PromeniStanjeOnlineRezultati(context, payload) {
        //     context.commit("ONLINE_REZULTATI", payload);
        // },
        //snackbar componenta da moze da na "close" zatvori snackbar
        toggleSnackbar_off({ commit }, payload) {
            commit("TOOGLE_SNACKBAR", payload);
        },
        SignupUser({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(cred => {
                    //ako je sve OK...onda (then) upisi i dodatne podatke za tog korisnika
                    //da u firestore snimi dodatne podatke (ime i prezime) vezane za UnidID (uid) bas tog user-a koji je napravio account
                    return firebase.firestore().collection('users').doc(cred.user.uid).set({
                        ime: payload.ime,
                        prezime: payload.prezime,
                        admin: false

                    });

                }).then(() => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    commit('TOOGLE_SNACKBAR', {
                        boolean: true,
                        message: "Uspešno ste se registrovali !",
                        color: 'success'
                    });
                    setTimeout(() => {
                        commit("SET_REGISTER_DIALOG", false);
                    }, 500);
                })
                .catch(error => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    var errorCode = error.code;

                    if (errorCode == 'auth/email-already-in-use') {
                        if (this.state.snackbarBoolean == true) {
                            this.state.snackbarBoolean = false
                        }
                        payload = {
                            boolean: true,
                            message: "E-mail koji ste uneli vec je u funkciji !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/invalid-email') {
                        payload = {
                            boolean: true,
                            message: "E-mail koji ste uneli nije validan !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/weak-password') {
                        payload = {
                            boolean: true,
                            message: "Šifra mora da ima vise od 6 karaktera !",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)
                    } else if (errorCode == 'auth/operation-not-allowed') {
                        payload = {
                            boolean: true,
                            message: "Nažalost registracija je trenutno zabranjena",
                            color: 'error'
                        };
                        commit('TOOGLE_SNACKBAR', payload)

                    }
                });
        },
        promenaSifre({ commit }, payload) {

            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            var user = firebase.auth().currentUser;
            const credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                payload.oldPassword
            );

            user.reauthenticateWithCredential(credentials).then(() => {
                    user.updatePassword(payload.newPassword)
                        .then(() => {
                            this.state.LoadingButton = false;
                            this.state.DisabledButton = false;
                            this.state.promenaSifreDialog = false;
                            commit("TOOGLE_SNACKBAR", {
                                boolean: true,
                                message: "Uspešno ste promenili šifru !",
                                color: "success"
                            });
                        })
                        .catch(error => {
                            this.state.LoadingButton = false;
                            this.state.DisabledButton = false;
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode == "auth/weak-password") {
                                payload = {
                                    boolean: true,
                                    message: "Šifra je slaba, morate uneti minimum 6 karaktera",
                                    color: "error"
                                };
                                commit("TOOGLE_SNACKBAR", payload);
                            } else {
                                console.log(errorMessage)
                            }

                        });
                })
                .catch(error => {


                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode == "auth/wrong-password") {
                        payload = {
                            boolean: true,
                            message: "Niste uneli dobru šifru, pokušajte ponovo",
                            color: "error"
                        };
                        commit("TOOGLE_SNACKBAR", payload);
                    } else {
                        console.log(errorMessage)
                    }
                });
        },

        Logout({ commit }) {
            if (this.state.IsLoggedIn) {
                firebase.auth().signOut().then(() => {
                    firebase.auth().onAuthStateChanged(user => {
                            //ako je true...tj. ako je korisnik logovan
                            if (!user) {
                                commit("IS_LOGGED_IN", {
                                    IsLoggedIn: false, //obratiti paznju na mala pocetna slova
                                })
                            }
                        })
                        // }
                }).then(() => {
                    commit("TOOGLE_SNACKBAR", {
                        boolean: true,
                        message: "Uspešno ste se izlogovali !",
                        color: 'success'
                    })
                })
            }
        },
        Novo_obavestenje({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            return firebase.firestore().collection('obavestenja').add({
                naziv: payload.naziv,
                text: payload.text,
                show: false,
                datum: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                setTimeout(() => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    commit('TOOGLE_SNACKBAR', {
                        boolean: true,
                        message: "Uspešno ste se uneli novo obaveštenje !",
                        color: 'success'
                    });
                }, 500);
            })
        },
        Pregled_obavestenja({ commit }, payload) {
            this.state.LoadingDataObavestenja = true;
            return firebase.firestore().collection('obavestenja').orderBy('datum', 'desc').limit(payload).get().then(Snapshot => {
                    const sva_obavestenja = []
                    Snapshot.forEach(doc => {
                        sva_obavestenja.push({
                            id: doc.id,
                            datum: doc.data().datum,
                            naziv: doc.data().naziv,
                            show: doc.data().show,
                            text: doc.data().text,
                        })
                    })
                    commit('SVA_OBAVESTENJA', sva_obavestenja)
                }).then(() => {
                    this.state.LoadingDataObavestenja = false
                })
                .catch(function(error) {
                    console.log(error)
                });
        },
        Pregled_grupa_cena({ commit }) {
            this.state.LoadingDataUslugeCena = true;
            return firebase.firestore().collection('cenovnik').get().then(Snapshot => {
                const grupa_cena = []

                Snapshot.forEach(doc => {

                    grupa_cena.push({
                        naziv_grupe_cena: doc.id,
                        dataa: doc.data()
                    })
                })
                commit('GRUPA_CENA', grupa_cena)
            }).then(() => {
                //da zaustavi v-circular nakon ocitavanja podataka
                this.state.LoadingDataCenovnik = false;
                this.state.LoadingDataUslugeCena = false;
            }).catch(function(error) {
                console.log(error)
            });
        },

        Nova_Grupa_Cena({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            // toLowerCase snima a u UslugeCene.vue prikazuje prvo slovo veliko uz pomoc class="text-capitalize"
            var naziv_grupe = payload.naziv_grupe.toLowerCase()
                // var edit_grupa_cena1 = payload.edit_grupa_cena
            var collection_and_doc = firebase.firestore().collection('cenovnik').doc(naziv_grupe);
            var imaNema = "";
            firebase.firestore().runTransaction(function(transaction) {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(collection_and_doc).then(function(Podatak) {

                    if (Podatak.exists) {
                        imaNema = "zauzeto";
                    } else {
                        imaNema = "slobodno";
                    }
                })
            }).then(() => {
                if (imaNema === "slobodno") {
                    return firebase.firestore().collection('cenovnik').doc(naziv_grupe)
                        .set({
                            //   show: false
                        })
                        .then(() => {
                            setTimeout(() => {
                                this.state.LoadingButton = false;
                                this.state.DisabledButton = false;
                                commit('TOOGLE_SNACKBAR', {
                                    boolean: true,
                                    message: "Uspešno ste se uneli novu grupu cena !",
                                    color: 'success'
                                });
                            }, 500);
                        });

                } else if (imaNema === "zauzeto") {
                    setTimeout(() => {
                        this.state.LoadingButton = false;
                        this.state.DisabledButton = false;
                        commit('TOOGLE_SNACKBAR', {
                            boolean: true,
                            message: "Naziv koji ste uneli vec postoji !",
                            color: 'error'
                        });
                    }, 500);
                }
            })
        },
        Nova_Cena({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            return firebase.firestore().collection('cenovnik').doc(payload.Odabrana_grupa_cena).update(payload.Naziv_usluge, {
                    Naziv_usluge: payload.Naziv_usluge,
                    Opis_usluge: payload.Opis_usluge,
                    Cena: payload.Cena
                })
                .then(() => {
                    setTimeout(() => {
                        this.state.LoadingButton = false;
                        this.state.DisabledButton = false;
                        commit('TOOGLE_SNACKBAR', {
                            boolean: true,
                            message: "Uspešno ste se uneli novu cenu !",
                            color: 'success'
                        });
                    }, 500);
                })
        },
        Edit_Cena({ commit }, payload) { //edit usluge,opisa usluge i cene
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            return firebase.firestore().collection('cenovnik').doc(payload.Odabrana_grupa_cena).update(payload.Naziv_usluge, {
                    Naziv_usluge: payload.Naziv_usluge,
                    Opis_usluge: payload.Opis_usluge,
                    Cena: payload.Cena
                })
                .then(() => {
                    setTimeout(() => {
                        this.state.LoadingButton = false;
                        this.state.DisabledButton = false;
                        commit('TOOGLE_SNACKBAR', {
                            boolean: true,
                            message: "Uspešno ste se izvršili promenu !",
                            color: 'success'
                        });
                    }, 500);
                })
        },
        Edit_Grupe_Cena({ commit, dispatch }, payload) {
            //Posto Firebase nema API za menjanje naziva document-a, ovo je jedini nacin da se to uradi. Napravi se novi dokument,
            //kopiraju se podaci iz starog dokumenta(koji zelimo da preimenujemo) u novi koji smo napravili, obrisemo stari dokument
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            var stariNaziv = payload.naziv_grupe1;
            var noviNaziv = payload.nova_grupa_cena;

            if (stariNaziv === noviNaziv) {
                setTimeout(() => {
                    //GASIMO DUGMICE
                    commit('BUTTONS', {
                            LoadingButton: false,
                            DisabledButton: false
                        })
                        //POZIVAMO SNACKBAR
                    commit('TOOGLE_SNACKBAR', {
                        boolean: true,
                        message: "Niste promenili naziv grupe cena, novi naziv mora da se razlikuje od starog!",
                        color: 'error'
                    });
                }, 500);

            } else {
                const firestore = firebase.firestore();
                firestore.collection("cenovnik").doc(stariNaziv).get().then(function(doc) {

                    if (doc && doc.exists) {
                        var data = doc.data();
                        // saves the data to '.doc("")'
                        firestore.collection("cenovnik").doc(noviNaziv).set(data).then(() => {
                            // deletes the old document '.doc("")'
                            firestore.collection("cenovnik").doc(stariNaziv).delete();
                        }).then(() => {

                            setTimeout(() => {
                                //KADA SE PROMENI NAZIV DA REFRESH STRANICU
                                dispatch('Pregled_grupa_cena')
                                    //GASIMO DUGMICE
                                commit('BUTTONS', {
                                        LoadingButton: false,
                                        DisabledButton: false
                                    })
                                    //POZIVAMO SNACKBAR
                                commit('TOOGLE_SNACKBAR', {
                                    boolean: true,
                                    message: "Uspešno ste se promenili naziv grupe cena !",
                                    color: 'success'
                                });
                            }, 500);

                        })
                    } else if (!doc.exists) {
                        setTimeout(() => {
                            commit('BUTTONS', {
                                LoadingButton: false,
                                DisabledButton: false
                            })
                            commit('TOOGLE_SNACKBAR', {
                                boolean: true,
                                message: "Ovaj naziv grupe cena ne postoji, osvežite stranicu !",
                                color: 'error'
                            });
                        }, 500);
                    }
                })
            }
        },
        Novo_najcesce_pitanje({ commit }, payload) {
            this.state.LoadingButton = true;
            this.state.DisabledButton = true;
            return firebase.firestore().collection('najcesca_pitanja').add({
                pitanje: payload.pitanje,
                odgovor: payload.odgovor,
                show: false
            }).then(() => {
                setTimeout(() => {
                    this.state.LoadingButton = false;
                    this.state.DisabledButton = false;
                    commit('TOOGLE_SNACKBAR', {
                        boolean: true,
                        message: "Uspešno ste se uneli novo najčešće pitanje !",
                        color: 'success'
                    });
                }, 500);
            })
        },
        Pregled_najcescih_pitanja({ commit }) {
            this.state.LoadingDataUnosNajcescihPitanja = true
            return firebase.firestore().collection('najcesca_pitanja').get().then(Snapshot => {
                const sva_najcesca_pitanja = []
                Snapshot.forEach(doc => {
                    sva_najcesca_pitanja.push({
                        id: doc.id,
                        pitanje: doc.data().pitanje,
                        odgovor: doc.data().odgovor,
                        show: doc.data().show,
                    })
                })
                commit('SVA_NAJCESCA_PITANJA', sva_najcesca_pitanja)
            }).then(() => {
                //da zaustavi v-circular nakon ocitavanja podataka
                this.state.LoadingDataUnosNajcescihPitanja = false
                this.state.LoadingDataNajcescaPitanja = false
            }).catch(function(error) {
                console.log(error)
            });
        },
        // Nudimo({ commit }, payload) {
        //     var asd = payload
        //     var citiesRef = firebase.firestore().collection("nudimo");

        //     var query = citiesRef.where("id", "==", `${asd}`).onSnapshot(sss => {
        //         sss.forEach(function(doc) {
        //             console.log(doc.data())
        //         })
        //     })
        //     console.log(query)

        //     commit('GRUPA_NUDIMO')
        // }
    },

})