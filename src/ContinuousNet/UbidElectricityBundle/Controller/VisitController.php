<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Visit;
use ContinuousNet\UbidElectricityBundle\Form\VisitType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Visit Controller
 * 
 * Manage Visits 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		VisitController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/visit")
 */
class VisitController extends BaseController
{
	/**
	 * Lists all Visit entities.
	 *
	 * @Route("/", name="visit_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$visits = $em->getRepository('UbidElectricityBundle:Visit')->findAll();

		return $this->render('UbidElectricityBundle:Visit:index.html.twig', array(
			'visits' => $visits,
		));
	}

	/**
	 * Creates a new Visit entity.
	 *
	 * @Route("/new", name="visit_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$visit = new Visit();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\VisitType', $visit);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($visit);
			$em->flush();

			return $this->redirectToRoute('visit_show', array('id' => $visit->getId()));
		}

		return $this->render('UbidElectricityBundle:Visit:new.html.twig', array(
			'visit' => $visit,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Visit entity.
	 *
	 * @Route("/{id}", name="visit_show")
	 * @Method("GET")
	 */
	public function showAction(Visit $visit)
	{
		$deleteForm = $this->createDeleteForm($visit);

		return $this->render('UbidElectricityBundle:Visit:show.html.twig', array(
			'visit' => $visit,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Visit entity.
	 *
	 * @Route("/{id}/edit", name="visit_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Visit $visit)
	{
		$deleteForm = $this->createDeleteForm($visit);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\VisitType', $visit);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($visit);
			$em->flush();

			return $this->redirectToRoute('visit_edit', array('id' => $visit->getId()));
		}

		return $this->render('UbidElectricityBundle:Visit:edit.html.twig', array(
			'visit' => $visit,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Visit entity.
	 *
	 * @Route("/{id}", name="visit_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Visit $visit)
	{
		$form = $this->createDeleteForm($visit);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($visit);
			$em->flush();
		}

		return $this->redirectToRoute('visit_index');
	}

	/**
	 * Creates a form to delete a Visit entity.
	 *
	 * @param Visit $visit The Visit entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Visit $visit)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('visit_delete', array('id' => $visit->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
