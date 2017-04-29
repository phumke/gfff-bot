module.exports = {
  HELP: 'help',
  BRETT_LIKES_MEN: 'brett likes men',
  BRETT_LOVES_DICKS: 'brett loves dicks',
  BRETT: 'brett',
  MEN: 'men',
  MY_HERO: 'my hero',
  MY_HERO2: 'mh',
  OUR: 'our',
  HEROS: 'heros',
  OH: 'oh',
  MY_WEENIS: 'my weenis',
  WEENIS: 'weenis',
}

// TODO new code still in work - saving this here until I can get home and finish refactoring

Exact_input = {
  'help': getHelp(),
  'my hero': getMyHero(),
  'brett likes men': getMyHero(),
  'weenis': getEggplant(),
};

contains_all = {
  [
    'brett',
    'men'
  ]: brettLikesMen(),
  [
    "str",
    "test",
  ]: doesNotExist(),
};

function handle_message(msg) {
  var msgl = lower(msg);
  var retval;
  retval = handle_exact_input(msgl);
  if (!retval) {
    retval = handle_contains_all(msgl);
  }

  return retval;
};

function handle_exact_input(msgl) {
  if exact_input.contains(msgl) {
    return exact_input[msgl];
  }

  return null;
};

function handle_contains_all(msgl) {
  for entry in contains_all {
    var elems = entry.key();
    var to_call = entry.value();
    var matches = true;
    for elem in elems {
      if !msgl.contains(elem) {
        matches = false;
        break;
      }
    }
    if matches {
      return to_call();
    }
  }
  return null;
};
