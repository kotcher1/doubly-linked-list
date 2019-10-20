const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let newTail = new Node(data);
        if (this.length === 0) {
            this._head = newTail;
            this._tail = newTail;
        } else {
            newTail.prev = this._tail;
            this._tail.next = newTail;
            this._tail = newTail;
        }
        this.length++; 
        return this;
    }

    head() {
        if (this._head === null) {
            return null;
        }
        return this._head.data;
    }

    tail() {
        if (this._tail === null) {
            return null;
        }
        return this._tail.data;
    }

    at(index) {
        let i = 0;
        let current = this._head;

        while(i < index) {
            current = current.next;
            i++;
        }

        return current.data;
    }

    insertAt(index, data) {
        let newElement = new Node(data);
        let current = this._head;
        let i = 0;
        if (index === this.length) {
            this.append(data);
            return this;
        } else if (index === 0) {
            newElement.next = this._head;
            this._head.prev = newElement;
            this._head = newElement;
        } else {
            while (i < index) {
                current = current.next;
                i++;
            }

            let before = current.prev;
            newElement.prev = before;
            before.next = newElement;
            current.prev = newElement;
            newElement.next = current;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        let i = 0;
        let current = this._head;
        if (index === 0) {
            if (this.length === 1) {
                return this.clear();
            } else {
                current.next.prev = null;
                this._head = current.next;
            }
        } else if (index === this.length - 1) {
            current = this._tail;
            current.prev.next = null;
            this._tail = current.prev;
        } else {
            while (i < index) {
                current = current.next;
                i++;
            }
            current.next.prev = current.prev;
            current.prev.next = current.next;
        }      
        this.length--;
        return this;
    }

    reverse() {
        let removedItem = this._tail;
        let index = 0;
        while (index < this.length) {
            this.insertAt(index, this._tail.data);
            this.deleteAt(this.length - 1);
            index++;
        }
        return this;
    }

    indexOf(data) {
        let index = 0;
        let current = this._head;

        while (index < this.length) {
            if (current.data === data) {
                return index;
            } else {
                current = current.next;
                index++;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;
