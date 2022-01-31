import React from 'react'
import { computed, makeObservable } from "mobx"

export default class DisplayCtrl {
    constructor(state) {
        this.state = state

        makeObservable(this, {
            result: computed,
            memory: computed
        });

    }

    get result() {
        return this.state.result
    }

    get memory() {
        return this.state.memory
    }
}