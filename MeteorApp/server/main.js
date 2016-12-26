import { Meteor } from 'meteor/meteor';
import '/imports/api/items';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		var currentUserId = this.userId();
		Habits = new Mongo.Collection(currentUserId+"");
		Habits.insert({userId: currentUserId, habitId: habit.habitId, title: habit.title, streak: habit.streak});
	},
	'removeHabit': function(habit) {
		var currentUserId = this.userId();
		Habits = new Mongo.Collection(currentUserId+"");
		Habits.remove({habitId: habit.habitId});
	},
	'updateStreak': function(habit) {
		//expect habit to have {habitId, integer, title: String, streak: int}
		var currentUserID = this.userId();
		Habits = new Mongo.Collection(currentUserId+"");
		Habits.update({habitId: habit.habitId}, {$inc: {streak: 1}});	
	}
});

Meteor.publish('habits', function habitsPublication() {
			var currentUserId = this.userId();
			Habits = new Mongo.Collection(currentUserId+"");
			return Habits.find({userId: this.userId()}).fetch();
});