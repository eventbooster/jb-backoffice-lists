( function() {

	'use strict';


	/**
	* Renders all default stuff for a listview, including
	* - title
	* - notifications
	* - add button
	* Transcludes datatable for the entity.
	*/
	angular
	.module( 'jb.backofficeListView', [ 'ui.router' ] )
	.directive( 'listView', [ '$filter', '$state', '$stateParams', function( $filter, $state, $stateParams ) {

		return {
			link			: function( scope, element, attrs ) {

				var entityName = $stateParams.entityName;

				// TRANSLATIONS
				// Set translations
				scope.titleText = $filter( 'translate' )( 'web.backoffice.' + entityName + '.maintitle' );
				scope.addText = $filter( 'translate' )( 'web.backoffice.' + entityName + '.add' );

				// FUNCTIONS
				// Redirect functions for add and edit
				scope.add = function() {
					$state.go( 'app.detail', { entityName: entityName, entityId: 'new' } );
				};

				scope.edit = function( id ) {
					$state.go( 'app.detail', { entityName: entityName, entityId: id } );
				};


				// Edit fields
				// - Prepend with ID
				// - Append edit button
				if( scope.fields ) {
					// ID
					scope.fields.unshift( {
						title		: 'ID'
						, selector	: 'id'
					} );
					// Edit
					scope.fields.push( {
						content: function( data ) {
							return '<a class="btn btn-default btn-sm" ui-sref="app.detail({\'entityName\':\'' +  entityName + '\', \'entityId\':' + data.id + '})">' + $filter( 'translate' )( 'web.backoffice.edit' ) + '</button>';
						}
					} );
				}


			}
			, templateUrl	: 'listViewTemplate.html'
			, transclude	: true
		};

	} ] )
	.run( function( $templateCache ) {

		$templateCache.put( 'listViewTemplate.html',
			'<div clas=\'col-xs-12\'>' +
				'<h3>{{ titleText }}</h3>' +
				'<div class=\'boxed\'>' +
					'<div class=\'inner\'>' +

						'<div notification></div>' +
						'<div class=\'row list-menu\'>' +
							'<div class=\'col-xs-12\'>' +
								'<button type=\'button\' class=\'btn btn-sm btn-primary pull-right\' ng-click=\'add()\'>' +
									'<i class=\'fa fa-plus\'></i>' +
									'{{ addText }}' +
								'</button>' +
							'</div>' +
						'</div>' +
						'<div class=\'row\'>' +
							'<div class=\'col-xs-12\'>' +
								// Datatable goes here
								'<div data-ng-transclude></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);

	} );

} )();