<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Variable;
use ContinuousNet\BiodyXpertBundle\Form\VariableType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Variable Controller
 * 
 * Manage Variables 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		VariableController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/variable")
 */
class VariableController extends BaseController
{
	/**
	 * Lists all Variable entities.
	 *
	 * @Route("/", name="variable_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$variables = $em->getRepository('BiodyXpertBundle:Variable')->findAll();

		return $this->render('BiodyXpertBundle:Variable:index.html.twig', array(
			'variables' => $variables,
		));
	}

	/**
	 * Creates a new Variable entity.
	 *
	 * @Route("/new", name="variable_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$variable = new Variable();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\VariableType', $variable);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($variable);
			$em->flush();

			return $this->redirectToRoute('variable_show', array('id' => $variable->getId()));
		}

		return $this->render('BiodyXpertBundle:Variable:new.html.twig', array(
			'variable' => $variable,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Variable entity.
	 *
	 * @Route("/{id}", name="variable_show")
	 * @Method("GET")
	 */
	public function showAction(Variable $variable)
	{
		$deleteForm = $this->createDeleteForm($variable);

		return $this->render('BiodyXpertBundle:Variable:show.html.twig', array(
			'variable' => $variable,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Variable entity.
	 *
	 * @Route("/{id}/edit", name="variable_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Variable $variable)
	{
		$deleteForm = $this->createDeleteForm($variable);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\VariableType', $variable);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($variable);
			$em->flush();

			return $this->redirectToRoute('variable_edit', array('id' => $variable->getId()));
		}

		return $this->render('BiodyXpertBundle:Variable:edit.html.twig', array(
			'variable' => $variable,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Variable entity.
	 *
	 * @Route("/{id}", name="variable_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Variable $variable)
	{
		$form = $this->createDeleteForm($variable);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($variable);
			$em->flush();
		}

		return $this->redirectToRoute('variable_index');
	}

	/**
	 * Creates a form to delete a Variable entity.
	 *
	 * @param Variable $variable The Variable entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Variable $variable)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('variable_delete', array('id' => $variable->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
