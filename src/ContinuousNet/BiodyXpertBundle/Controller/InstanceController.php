<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Instance;
use ContinuousNet\BiodyXpertBundle\Form\InstanceType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Instance Controller
 * 
 * Manage Instances 
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
 * @see		InstanceController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/instance")
 */
class InstanceController extends BaseController
{
	/**
	 * Lists all Instance entities.
	 *
	 * @Route("/", name="instance_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$instances = $em->getRepository('BiodyXpertBundle:Instance')->findAll();

		return $this->render('BiodyXpertBundle:Instance:index.html.twig', array(
			'instances' => $instances,
		));
	}

	/**
	 * Creates a new Instance entity.
	 *
	 * @Route("/new", name="instance_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$instance = new Instance();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\InstanceType', $instance);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($instance);
			$em->flush();

			return $this->redirectToRoute('instance_show', array('id' => $instance->getId()));
		}

		return $this->render('BiodyXpertBundle:Instance:new.html.twig', array(
			'instance' => $instance,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Instance entity.
	 *
	 * @Route("/{id}", name="instance_show")
	 * @Method("GET")
	 */
	public function showAction(Instance $instance)
	{
		$deleteForm = $this->createDeleteForm($instance);

		return $this->render('BiodyXpertBundle:Instance:show.html.twig', array(
			'instance' => $instance,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Instance entity.
	 *
	 * @Route("/{id}/edit", name="instance_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Instance $instance)
	{
		$deleteForm = $this->createDeleteForm($instance);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\InstanceType', $instance);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($instance);
			$em->flush();

			return $this->redirectToRoute('instance_edit', array('id' => $instance->getId()));
		}

		return $this->render('BiodyXpertBundle:Instance:edit.html.twig', array(
			'instance' => $instance,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Instance entity.
	 *
	 * @Route("/{id}", name="instance_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Instance $instance)
	{
		$form = $this->createDeleteForm($instance);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($instance);
			$em->flush();
		}

		return $this->redirectToRoute('instance_index');
	}

	/**
	 * Creates a form to delete a Instance entity.
	 *
	 * @param Instance $instance The Instance entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Instance $instance)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('instance_delete', array('id' => $instance->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
