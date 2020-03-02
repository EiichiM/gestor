import * as actionTypes from 'src/actions';
import Cookies from 'js-cookie';

const initialState = {
  loggedIn: true,
  user: {
    // first_name: this.users.names,
    // last_name: this.users.fathersLastName,
    // email: this.users.email,
    // avatar: '/images/avatars/avatar_11.png'
    //   bio: 'Brain Director',
    // role: 'USER' // ['GUEST', 'USER', 'ADMIN']
  },
  loading: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      Cookies.set('user', action.payload, { expires: 1 });
      initialState.user = Cookies.getJSON('user');
      // console.log(Cookies.set('user', action.payload));
      console.log(initialState.user);
      localStorage.setItem('token', initialState);
      // localStorage.setItem('userid', initialState.user);
      if (initialState.loggedIn === true) {
        return {
          ...initialState
        };
      }
      return {};
    }

    case actionTypes.SESSION_LOGOUT: {
      // const delate = action.payload;
      // Object.keys(Cookies.get()).forEach((user) => {
      //   const neededAttributes = {
      //     delate
      //   };
      //   Cookies.remove(user, neededAttributes);
      // });
      Cookies.remove('user', action.payload);
      console.log(Cookies.set('user', action.payload));
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
